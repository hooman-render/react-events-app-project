export const appColors = {
  appBg: "#031414",
  appBgAccent: "#052020",
  surface: "#071717",
  surfaceRaised: "#0b1f1f",
  surfaceOverlay: "rgba(8, 24, 24, 0.94)",
  surfaceInset: "rgba(3, 16, 16, 0.92)",
  border: "rgba(180, 255, 245, 0.16)",
  borderStrong: "rgba(203, 184, 255, 0.24)",
  text: "#f5f7fb",
  textMuted: "#9eb2b5",
  primary: "#cbb8ff",
  primaryHover: "#dccfff",
  secondary: "#18d6c7",
  focusRing: "rgba(203, 184, 255, 0.36)",
  danger: "#f87171",
};

export const appShadows = {
  panel:
    "0 20px 50px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(180, 255, 245, 0.04)",
  raised:
    "0 16px 36px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(180, 255, 245, 0.03)",
  glow: "0 14px 34px rgba(24, 214, 199, 0.10)",
  cardHover:
    "0 26px 52px rgba(0, 0, 0, 0.34), 0 0 28px rgba(24, 214, 199, 0.09)",
};

export const appRadii = {
  panel: "2xl",
  inner: "xl",
  pill: "full",
};

export const appTransitions = {
  fast: "all 0.18s ease",
  smooth: "all 0.2s ease",
};

export const appLayout = {
  drawerWidth: { base: "calc(100vw - 1rem)", sm: "22rem" },
  shellMaxWidth: "1600px",
};

export const appHeroStyles = {
  bg: "linear-gradient(145deg, rgba(10, 28, 28, 0.96) 0%, rgba(6, 17, 17, 0.98) 58%, rgba(8, 24, 24, 0.98) 100%)",
  borderWidth: "1px",
  borderColor: appColors.borderStrong,
  boxShadow: "0 24px 56px rgba(0, 0, 0, 0.32), 0 0 36px rgba(24, 214, 199, 0.06)",
};

export const appCardImageOverlay = {
  bg: "linear-gradient(180deg, rgba(3, 12, 12, 0.04) 0%, rgba(2, 10, 10, 0.58) 100%)",
};

export const appSurfaceStyles = {
  bg: appColors.surface,
  borderWidth: "1px",
  borderColor: appColors.border,
  boxShadow: appShadows.panel,
};

export const appRaisedSurfaceStyles = {
  bg: appColors.surfaceRaised,
  borderWidth: "1px",
  borderColor: appColors.border,
  boxShadow: appShadows.raised,
};

export const appHeaderSurfaceStyles = {
  backdropFilter: "blur(14px)",
  bg: "rgba(6, 17, 17, 0.84)",
  borderBottomWidth: "1px",
  borderColor: appColors.border,
  boxShadow: appShadows.raised,
};

export const appDrawerSurfaceStyles = {
  bg: "rgba(7, 23, 23, 0.98)",
  borderWidth: "1px",
  borderColor: appColors.borderStrong,
  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.34), 0 0 32px rgba(24, 214, 199, 0.08)",
};

export const appDialogSurfaceStyles = {
  bg: "linear-gradient(145deg, rgba(10, 28, 28, 0.98) 0%, rgba(7, 23, 23, 0.98) 58%, rgba(8, 24, 24, 0.98) 100%)",
  borderWidth: "1px",
  borderColor: appColors.borderStrong,
  boxShadow: "0 26px 62px rgba(0, 0, 0, 0.34), 0 0 32px rgba(24, 214, 199, 0.06)",
};

export const appSectionSurfaceStyles = {
  bg: "linear-gradient(180deg, rgba(11, 31, 31, 0.96) 0%, rgba(7, 23, 23, 0.96) 100%)",
  borderWidth: "1px",
  borderColor: appColors.border,
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.02)",
};

export const appDangerSurfaceStyles = {
  bg: "linear-gradient(180deg, rgba(48, 12, 12, 0.94) 0%, rgba(28, 10, 10, 0.98) 100%)",
  borderWidth: "1px",
  borderColor: "rgba(248, 113, 113, 0.24)",
  boxShadow: "0 16px 32px rgba(0, 0, 0, 0.22), 0 0 24px rgba(248, 113, 113, 0.08)",
};

export const appInputStyles = {
  bg: appColors.surfaceInset,
  borderColor: appColors.border,
  color: appColors.text,
  transition: appTransitions.smooth,
  _placeholder: { color: appColors.textMuted },
  _hover: {
    borderColor: "rgba(180, 255, 245, 0.28)",
  },
  _focusVisible: {
    borderColor: appColors.primary,
    boxShadow: `0 0 0 3px ${appColors.focusRing}`,
  },
};

export const appPrimaryButtonStyles = {
  bg: appColors.primary,
  color: "#120f1e",
  borderWidth: "1px",
  borderColor: "rgba(255, 255, 255, 0.08)",
  boxShadow: "0 12px 24px rgba(203, 184, 255, 0.22)",
  fontWeight: "600",
  transition: appTransitions.smooth,
  _hover: {
    bg: appColors.primaryHover,
    boxShadow: "0 16px 30px rgba(203, 184, 255, 0.28)",
    transform: "translateY(-1px)",
  },
  _active: {
    bg: "#bea8ff",
  },
  _focusVisible: {
    boxShadow: `0 0 0 3px ${appColors.focusRing}`,
  },
};

export const appNeutralButtonStyles = {
  bg: appColors.surfaceInset,
  color: appColors.text,
  borderWidth: "1px",
  borderColor: appColors.border,
  fontWeight: "500",
  transition: appTransitions.smooth,
  _hover: {
    bg: appColors.surfaceRaised,
    borderColor: "rgba(180, 255, 245, 0.28)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.14)",
    transform: "translateY(-1px)",
  },
  _active: {
    bg: "rgba(8, 24, 24, 0.96)",
    transform: "translateY(0)",
  },
  _focusVisible: {
    boxShadow: `0 0 0 3px ${appColors.focusRing}`,
  },
};

export const appDangerButtonStyles = {
  colorPalette: "red",
  boxShadow: "0 10px 22px rgba(248, 113, 113, 0.18)",
  transition: appTransitions.smooth,
  _hover: {
    boxShadow: "0 14px 28px rgba(248, 113, 113, 0.22)",
    transform: "translateY(-1px)",
  },
  _active: {
    transform: "translateY(0)",
  },
  _focusVisible: {
    boxShadow: "0 0 0 3px rgba(248, 113, 113, 0.28)",
  },
};

export const appTagStyles = {
  bg: "rgba(203, 184, 255, 0.14)",
  borderWidth: "1px",
  borderColor: "rgba(203, 184, 255, 0.24)",
  color: "#efeaff",
  boxShadow: "0 8px 18px rgba(203, 184, 255, 0.12)",
  transition: appTransitions.fast,
  _hover: {
    bg: "rgba(203, 184, 255, 0.18)",
    borderColor: "rgba(203, 184, 255, 0.34)",
    boxShadow: "0 10px 20px rgba(203, 184, 255, 0.16)",
  },
};

export const appPlaceholderBadgeStyles = {
  bg: "rgba(24, 214, 199, 0.10)",
  borderWidth: "1px",
  borderColor: "rgba(24, 214, 199, 0.18)",
  color: "#b8f8f2",
  fontSize: "2xs",
  fontWeight: "600",
  px: "2",
  py: "1",
  rounded: appRadii.pill,
};
