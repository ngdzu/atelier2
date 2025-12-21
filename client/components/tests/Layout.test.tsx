import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { render as customRender } from './utils/test-utils';
import Layout from '../Layout';

describe('Layout', () => {
  it('should render without errors', () => {
    const { container } = customRender(
      <Layout userRole="OWNER">
        <div>Test Content</div>
      </Layout>
    );
    expect(container).toBeInTheDocument();
  });

  it('should display children content', () => {
    customRender(
      <Layout userRole="OWNER">
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should display user role', () => {
    customRender(
      <Layout userRole="ADMIN">
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('admin')).toBeInTheDocument(); // Role is lowercased in component
  });

  it('should display navigation items for OWNER role', () => {
    customRender(
      <Layout userRole="OWNER">
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });

  it('should not display admin-only items for EMPLOYEE role', () => {
    customRender(
      <Layout userRole="EMPLOYEE">
        <div>Content</div>
      </Layout>
    );
    // Employee should not see Dashboard or Customers
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument(); // Employee can see Schedule
  });

  it('should display sign out button', () => {
    customRender(
      <Layout userRole="OWNER">
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});

