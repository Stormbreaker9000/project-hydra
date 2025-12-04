"use client";

import { Box, Container } from "@mui/material";

// export default function BackgroundGradient({ children }: { children: React.ReactNode }) {
//     return (
//         <Box sx={(theme) => ({
//             width: "100%",
//             backgroundRepeat: "no-repeat",
//             backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
//             ...theme.applyStyles("dark", {
//                 backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(48, 100.00%, 16.10%), transparent)",
//             })
//         })}>
//             <Container maxWidth="xl">
//                 <Box sx={{ width: "100%", height: "100%", pt: 12, pb: 12 }}>
//                     {children}
//                 </Box>
//             </Container>
//         </Box>
//     )
// }

export default function BackgroundGradient() {
  return (
    <Box className="pointer-events-none fixed inset-0 -z-1 bg-radial from-cyan-500 via-blue-600/50 to-transparent pt-12 pb-12 opacity-20 transition-opacity duration-[2s] ease-linear dark:opacity-20"></Box>
  );
}
