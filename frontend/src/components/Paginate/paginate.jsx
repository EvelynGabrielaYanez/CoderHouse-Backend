

import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export default function PaginationOutlined({onChange, page, count}) {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{  display: 'flex', justifyContent: 'center', marginBottom: 10}}>
        <Pagination
          page={page}
          count={count}
          variant="outlined"
          onChange={onChange}
          />
      </Box>
    </div>
  );
}