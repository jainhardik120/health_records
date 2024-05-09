import { render, screen, waitFor } from "@testing-library/react";
import DetailsPage from '@/app/info/[address]/page';

describe('Page', () => {
  it('should render UserDetails component when the useEffect hook is triggered', async () => {
    render(<DetailsPage params={{ address: '0x93058c117e826828ee94b42b90391268BB10adea' }} />);
    await waitFor(() => {
      expect(screen.getByText('Doctor Details')).toBeInTheDocument();
    }, { timeout: 5000});
  });
});