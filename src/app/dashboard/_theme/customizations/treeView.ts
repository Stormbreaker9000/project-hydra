import { alpha, Theme } from '@mui/material/styles';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';
//import { gray, brand } from '../../../shared-theme/themePrimitives';
import { grey } from '@mui/material/colors';

/* eslint-disable import/prefer-default-export */
export const treeViewCustomizations: TreeViewComponents<Theme> = {
  MuiTreeItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: 'relative',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        '& .groupTransition': {
          marginLeft: theme.spacing(2),
          padding: theme.spacing(0),
          borderLeft: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
        '&:focus-visible .focused': {
          outline: `3px solid ${alpha(grey[500], 0.5)}`,
          outlineOffset: '2px',
          '&:hover': {
            backgroundColor: alpha(grey[300], 0.2),
            outline: `3px solid ${alpha(grey[500], 0.5)}`,
            outlineOffset: '2px',
          },
        },
      }),
      content: ({ theme }: { theme: Theme }) => ({
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        overflow: 'clip',
        '&:hover': {
          backgroundColor: alpha(grey[300], 0.2),
        },

        '&.selected': {
          backgroundColor: alpha(grey[300], 0.4),
          '&:hover': {
            backgroundColor: alpha(grey[300], 0.6),
          },
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            backgroundColor: alpha(grey[500], 0.2),
          },
          '&:focus-visible': {
            '&:hover': {
              backgroundColor: alpha(grey[500], 0.2),
            },
          },
          '&.selected': {
            backgroundColor: alpha(grey[500], 0.4),
            '&:hover': {
              backgroundColor: alpha(grey[500], 0.6),
            },
          },
        }),
      }),
    },
  },
};