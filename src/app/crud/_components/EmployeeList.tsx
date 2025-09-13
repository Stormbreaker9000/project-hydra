import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridEventListener,
  gridClasses,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDialogs } from '../_hooks/useDialogs/useDialogs';
import useNotifications from '../_hooks/useNotifications/useNotifications';
import {
  deleteOne as deleteEmployee,
  getMany as getEmployees,
  type Employee,
} from '../_data/employees';
import PageContainer from './PageContainer';

const INITIAL_PAGE_SIZE = 10;

export default function EmployeeList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
    pageSize: searchParams.get('pageSize')
      ? Number(searchParams.get('pageSize'))
      : INITIAL_PAGE_SIZE,
  });
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>(
    searchParams.get('filter')
      ? JSON.parse(searchParams.get('filter') ?? '')
      : { items: [] },
  );
  const [sortModel, setSortModel] = React.useState<GridSortModel>(
    searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
  );

  const [rowsState, setRowsState] = React.useState<{
    rows: Employee[];
    rowCount: number;
  }>({
    rows: [],
    rowCount: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const handlePaginationModelChange = React.useCallback(
    (model: GridPaginationModel) => {
      setPaginationModel(model);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', String(model.page));
      newSearchParams.set('pageSize', String(model.pageSize));

      const newSearchParamsString = newSearchParams.toString();

      navigate.push(
        `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
      );
    },
    [navigate.push, pathname, searchParams],
  );

  const handleFilterModelChange = React.useCallback(
    (model: GridFilterModel) => {
      setFilterModel(model);

      const newSearchParams = new URLSearchParams(searchParams);
      if (
        model.items.length > 0 ||
        (model.quickFilterValues && model.quickFilterValues.length > 0)
      ) {
        newSearchParams.set('filter', JSON.stringify(model));
      } else {
        newSearchParams.delete('filter');
      }

      const newSearchParamsString = newSearchParams.toString();

      navigate.push(
        `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
      );
    },
    [navigate.push, pathname, searchParams],
  );

  const handleSortModelChange = React.useCallback(
    (model: GridSortModel) => {
      setSortModel(model);

      const newSearchParams = new URLSearchParams(searchParams);
      if (model.length > 0) {
        newSearchParams.set('sort', JSON.stringify(model));
      } else {
        newSearchParams.delete('sort');
      }

      const newSearchParamsString = newSearchParams.toString();

      navigate.push(
        `${pathname}${newSearchParamsString ? '?' : ''}${newSearchParamsString}`,
      );
    },
    [navigate.push, pathname, searchParams],
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const listData = await getEmployees({
        paginationModel,
        sortModel,
        filterModel,
      });

      setRowsState({
        rows: listData.items,
        rowCount: listData.itemCount,
      });
    } catch (listDataError) {
      setError(listDataError as Error);
    }

    setIsLoading(false);
  }, [paginationModel, sortModel, filterModel]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = React.useCallback(() => {
    if (!isLoading) {
      loadData();
    }
  }, [isLoading, loadData]);

  const handleRowClick = React.useCallback<GridEventListener<'rowClick'>>(
    ({ row }) => {
      navigate.push(`/employees/${row.id}`);
    },
    [navigate.push],
  );

  const handleCreateClick = React.useCallback(() => {
    navigate.push('/employees/new');
  }, [navigate.push]);

  const handleRowEdit = React.useCallback(
    (employee: Employee) => () => {
      navigate.push(`/employees/${employee.id}/edit`);
    },
    [navigate.push],
  );

  const handleRowDelete = React.useCallback(
    (employee: Employee) => async () => {
      const confirmed = await dialogs.confirm(
        `Do you wish to delete ${employee.name}?`,
        {
          title: `Delete employee?`,
          severity: 'error',
          okText: 'Delete',
          cancelText: 'Cancel',
        },
      );

      if (confirmed) {
        setIsLoading(true);
        try {
          await deleteEmployee(Number(employee.id));

          notifications.show('Employee deleted successfully.', {
            severity: 'success',
            autoHideDuration: 3000,
          });
          loadData();
        } catch (deleteError) {
          notifications.show(
            `Failed to delete employee. Reason:' ${(deleteError as Error).message}`,
            {
              severity: 'error',
              autoHideDuration: 3000,
            },
          );
        }
        setIsLoading(false);
      }
    },
    [dialogs, notifications, loadData, navigate.push],
  );

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    [],
  );

  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', width: 140 },
      { field: 'age', headerName: 'Age', type: 'number' },
      {
        field: 'joinDate',
        headerName: 'Join date',
        type: 'date',
        valueGetter: (value) => value && new Date(value),
        width: 140,
      },
      {
        field: 'role',
        headerName: 'Department',
        type: 'singleSelect',
        valueOptions: ['Market', 'Finance', 'Development'],
        width: 160,
      },
      { field: 'isFullTime', headerName: 'Full-time', type: 'boolean' },
      {
        field: 'actions',
        type: 'actions',
        flex: 1,
        align: 'right',
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit-item"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleRowEdit(row)}
          />,
          <GridActionsCellItem
            key="delete-item"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleRowDelete(row)}
          />,
        ],
      },
    ],
    [handleRowEdit, handleRowDelete, navigate.push],
  );

  const pageTitle = 'Employees';

  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton size="small" aria-label="refresh" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        {error ? (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={rowsState.rows}
            rowCount={rowsState.rowCount}
            columns={columns}
            pagination
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            loading={isLoading}
            initialState={initialState}
            showToolbar
            pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: 'transparent',
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: 'none',
                },
              [`& .${gridClasses.row}:hover`]: {
                cursor: 'pointer',
              },
            }}
            slotProps={{
              loadingOverlay: {
                variant: 'circular-progress',
                noRowsVariant: 'circular-progress',
              },
              baseIconButton: {
                size: 'small',
              },
            }}
          />
        )}
      </Box>
    </PageContainer>
  );
}