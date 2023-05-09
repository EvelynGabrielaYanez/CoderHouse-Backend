

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationOutlined({onChange, page, count}) {
  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        count={count}
        variant="outlined"
        onChange={onChange} />
    </Stack>
  );
}