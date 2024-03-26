import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigatePrevIcon from '@mui/icons-material/NavigateBefore';
import i18n from '../../i18n';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface UrlModel {
  name: string;
  url: string;
};
export function BreadcrumbCom({ data }: any) {
  const breadcrumbs = [
    ...data.map((item: any) => {
      return (
        item.url != null ?
          <Link underline="hover" key="1" color="inherit" href={item.url}>
            {i18n.t(item.name)}
          </Link>
          :
          <Typography key="3" color="text.primary">
            {i18n.t(item.name)}
          </Typography>
      )
    })



  ];

  return (
    <Stack spacing={2}>

      <Breadcrumbs
        separator={<NavigatePrevIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}