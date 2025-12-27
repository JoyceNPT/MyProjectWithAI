import { render, screen } from '@testing-library/react';
import { RiskBadge } from '@/components/dashboard/risk-badge';

describe('RiskBadge', () => {
    it('renders Low Risk for level 2', () => {
        render(<RiskBadge level={2} />);
        expect(screen.getByText('Very Low Risk')).toBeInTheDocument();
        expect(screen.getByText(/Risk Level: 2\/10/)).toBeInTheDocument();
    });

    it('renders Moderate Risk for level 5', () => {
        render(<RiskBadge level={5} />);
        expect(screen.getByText('Moderate Risk')).toBeInTheDocument();
    });

    it('renders High Risk for level 8', () => {
        render(<RiskBadge level={8} />);
        expect(screen.getByText('High Risk')).toBeInTheDocument();
    });
});
