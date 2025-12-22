import { useState, useEffect } from 'react';
import { dataService } from '../../../services/dataService';
import { Service, Employee } from '../../../types';

/**
 * Hook to fetch and manage booking-related data (services and employees)
 */
export const useBookingData = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [svcData, empData] = await Promise.all([
          dataService.getServices(),
          dataService.getEmployees()
        ]);
        setServices(svcData);
        setEmployees(empData);
      } catch (error) {
        console.error('Failed to fetch booking data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { services, employees, loading };
};

