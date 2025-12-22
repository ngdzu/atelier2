import React, { useEffect, useRef } from 'react';
import Header from '../Header';
import { Appointment } from '../../types';
import { BookingFlowProps, Step } from './types';
import { BOOKING_STEPS } from './constants';
import { isStepValid } from './validation';
import {
  useBookingData,
  useBookingState,
  useServicesByCategory,
  useScrollSpy,
  useIndexScroll,
  useTimeSlots,
} from './hooks';
import {
  StepNavigation,
  ServiceStep,
  EmployeeStep,
  TimeStep,
  DetailsStep,
  ConfirmStep,
  SummaryDrawer,
  ShoppingBagButton,
  ContinueButton,
} from './components';

/**
 * Main BookingFlow component - orchestrates the multi-step booking process
 */
const BookingFlow: React.FC<BookingFlowProps> = ({ onComplete }) => {
  const { services, employees, loading } = useBookingData();
  const {
    step,
    setStep,
    selectedServices,
    selectedEmployee,
    setSelectedEmployee,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    customerInfo,
    setCustomerInfo,
    totalPrice,
    totalPoints,
    totalItemsCount,
    updateQuantity,
    getQuantity,
  } = useBookingState();

  const servicesByCategory = useServicesByCategory(services);
  const availableSlotsByHour = useTimeSlots();

  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const indexScrollRef = useRef<HTMLDivElement>(null);
  const { activeCategory, scrollToCategory } = useScrollSpy({
    step,
    loading,
    categoryRefs,
    indexScrollRef,
  });
  const { startScrolling, stopScrolling } = useIndexScroll(indexScrollRef);

  const currentStepIdx = BOOKING_STEPS.findIndex(s => s.key === step);
  const currentStep = BOOKING_STEPS[currentStepIdx];

  // Scroll to top and refresh reveals on step change
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).refreshReveals) (window as any).refreshReveals();
  }, [step]);

  const handleNext = () => {
    if (step === 'SERVICE') {
      setStep('EMPLOYEE');
    } else if (step === 'EMPLOYEE') {
      setStep('TIME');
    } else if (step === 'TIME') {
      setStep('DETAILS');
    } else if (step === 'DETAILS') {
      onComplete({
        customerId: 'new',
        employeeId: selectedEmployee?.id || '',
        serviceId: selectedServices[0]?.service.id || '',
        startTime: `${selectedDate}T${selectedTime}:00`,
        status: 'SCHEDULED',
      });
      setStep('CONFIRM');
    }
    setIsSummaryOpen(false);
  };

  const goToStep = (targetStep: Step, targetIdx: number) => {
    const canNavigate =
      targetIdx <= currentStepIdx ||
      BOOKING_STEPS.slice(0, targetIdx).every(s => isStepValid(s.key, selectedServices, selectedEmployee, selectedTime, customerInfo));
    if (canNavigate && step !== 'CONFIRM') {
      setStep(targetStep);
      setIsSummaryOpen(false);
    }
  };

  const stepValidation = (checkStep: Step) =>
    isStepValid(checkStep, selectedServices, selectedEmployee, selectedTime, customerInfo);

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-32 selection:bg-black selection:text-white">
      <Header />

      <style>{`
        .atelier-index-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .atelier-index-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-6xl mx-auto py-24 px-6 relative">
        {/* Decorative logo in top corner */}
        <div className="absolute top-0 right-0 pointer-events-none">
          <img src="/logo.png" alt="" className="h-32 w-auto opacity-10" />
        </div>

        {step !== 'CONFIRM' && (
          <StepNavigation
            steps={BOOKING_STEPS}
            currentStep={step}
            currentStepIdx={currentStepIdx}
            isStepValid={stepValidation}
            onStepClick={goToStep}
          />
        )}

        <div className="min-h-[600px] reveal">
          {step === 'SERVICE' && (
            <ServiceStep
              services={services}
              servicesByCategory={servicesByCategory}
              loading={loading}
              activeCategory={activeCategory}
              categoryRefs={categoryRefs}
              indexScrollRef={indexScrollRef}
              getQuantity={getQuantity}
              onQuantityChange={updateQuantity}
              onCategoryClick={scrollToCategory}
              onScrollStart={startScrolling}
              onScrollStop={stopScrolling}
            />
          )}

          {step === 'EMPLOYEE' && (
            <EmployeeStep
              employees={employees}
              selectedEmployeeId={selectedEmployee?.id || null}
              onEmployeeSelect={setSelectedEmployee}
            />
          )}

          {step === 'TIME' && (
            <TimeStep
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableSlotsByHour={availableSlotsByHour}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />
          )}

          {step === 'DETAILS' && (
            <DetailsStep
              customerInfo={customerInfo}
              onCustomerInfoChange={setCustomerInfo}
            />
          )}

          {step === 'CONFIRM' && (
            <ConfirmStep
              customerName={customerInfo.name}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedEmployee={selectedEmployee}
              totalItemsCount={totalItemsCount}
            />
          )}

          {step !== 'CONFIRM' && (
            <ContinueButton
              label={currentStep?.nextLabel || 'Continue'}
              onClick={handleNext}
              disabled={!stepValidation(step)}
            />
          )}
        </div>
      </div>

      {step === 'SERVICE' && selectedServices.length > 0 && (
        <ContinueButton
          label="Continue to Professional"
          onClick={handleNext}
          variant="floating"
          disabled={!stepValidation(step)}
        />
      )}

      {step !== 'CONFIRM' && (
        <ShoppingBagButton
          totalItemsCount={totalItemsCount}
          totalPrice={totalPrice}
          onClick={() => setIsSummaryOpen(true)}
        />
      )}

      <SummaryDrawer
        isOpen={isSummaryOpen}
        step={step}
        selectedServices={selectedServices}
        selectedEmployee={selectedEmployee}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        totalPrice={totalPrice}
        totalPoints={totalPoints}
        currentStepNextLabel={currentStep?.nextLabel || 'Continue'}
        isValid={stepValidation(step)}
        onClose={() => setIsSummaryOpen(false)}
        onQuantityUpdate={(service, delta) => {
          const svc = selectedServices.find(item => item.service.id === service.id)?.service;
          if (svc) updateQuantity(svc, delta);
        }}
        onNext={handleNext}
      />
    </div>
  );
};

export default BookingFlow;

