export interface Bug {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  assignee: string;
}

export let bugs: Bug[] = [
  {
    id: '1',
    title: 'Login page not loading',
    description: 'Users cannot access the login page, getting 404 error',
    severity: 'high',
    status: 'open',
    assignee: 'John Doe'
  },
  {
    id: '2',
    title: 'Button color is wrong',
    description: 'Submit button should be blue but appears green',
    severity: 'low',
    status: 'in-progress',
    assignee: 'Jane Smith'
  }
];