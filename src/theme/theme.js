export const colorPalette = {
    background: '#0b0f14',
    backgroundAccent: '#172232',
    backgroundDeep: '#05080d',
    surface: '#111821',
    surfaceAlt: '#182433',
    surfaceRaised: '#1b2633',
    surfaceInset: 'rgba(7, 12, 19, 0.82)',
    surfaceOverlay: 'rgba(16, 24, 34, 0.94)',
    text: '#f3f7fb',
    textMuted: '#b4c0cc',
    border: 'rgba(165, 184, 204, 0.2)',
    borderStrong: 'rgba(165, 184, 204, 0.36)',
    primary: '#79aee8',
    primaryHover: '#9ac3ef',
    primaryActive: '#679dd8',
    primaryText: '#0d1722',
    primarySoft: 'rgba(121, 174, 232, 0.12)',
    primarySoftHover: 'rgba(121, 174, 232, 0.18)',
    primaryBorder: 'rgba(121, 174, 232, 0.3)',
    primaryShadow: '0 14px 28px rgba(121, 174, 232, 0.24)',
    primaryShadowHover: '0 18px 34px rgba(121, 174, 232, 0.32)',
    neutralSoft: 'rgba(255, 255, 255, 0.04)',
    neutralSoftHover: 'rgba(255, 255, 255, 0.07)',
    neutralSoftActive: 'rgba(255, 255, 255, 0.1)',
    neutralBorder: 'rgba(255, 255, 255, 0.08)',
    focusRing: 'rgba(121, 174, 232, 0.34)',
    danger: '#ff6b6b',
    dangerBg: '#dc2626',
    dangerHover: '#ef4444',
    dangerActive: '#b91c1c',
    dangerText: '#fff7f7',
    dangerSoft: 'rgba(248, 113, 113, 0.14)',
    dangerBorder: 'rgba(254, 202, 202, 0.36)',
    dangerShadow: '0 10px 22px rgba(248, 113, 113, 0.22)',
    dangerShadowHover: '0 14px 28px rgba(248, 113, 113, 0.28)',
    dangerFocus: 'rgba(248, 113, 113, 0.34)',
    skeletonBaseStart: 'rgba(185, 206, 225, 0.18)',
    skeletonBaseEnd: 'rgba(224, 235, 245, 0.34)',
    skeletonAccentStart: 'rgba(121, 174, 232, 0.3)',
    skeletonAccentEnd: 'rgba(178, 209, 243, 0.48)',
    overlayDark: 'rgba(3, 7, 12, 0.82)',
    shadowPanel: '0 20px 50px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(121, 174, 232, 0.04)',
    shadowRaised: '0 16px 36px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(121, 174, 232, 0.03)',
    shadowInset: 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
    shadowPrimary: '0 14px 34px rgba(121, 174, 232, 0.12)',
    shadowCardHover: '0 26px 52px rgba(0, 0, 0, 0.34), 0 0 28px rgba(121, 174, 232, 0.12)',
    shadowDanger: '0 16px 32px rgba(0, 0, 0, 0.22), 0 0 28px rgba(248, 113, 113, 0.14)',
    appBackground: 'radial-gradient(circle at top, #172232 0%, #0b0f14 48%, #05080d 100%)',
    heroPanelGradient: 'linear-gradient(145deg, #182433 0%, #111821 55%, #203249 100%)',
    cardImageOverlayGradient: 'linear-gradient(180deg, rgba(121, 174, 232, 0.05) 0%, rgba(5, 8, 13, 0.6) 100%)',
    dialogPanelGradient: 'linear-gradient(145deg, #16202d 0%, #111821 58%, #0d141e 100%)',
    sectionPanelGradient: 'linear-gradient(180deg, rgba(24, 36, 51, 0.96) 0%, rgba(17, 24, 33, 0.96) 100%)',
    eventMetaGradient: 'linear-gradient(180deg, rgba(18, 28, 40, 0.96) 0%, rgba(12, 18, 27, 0.96) 100%)',
    dangerPanelGradient: 'linear-gradient(180deg, rgba(74, 18, 18, 0.96) 0%, rgba(42, 13, 13, 0.98) 100%)',
};

export const shadows = {
    panel: colorPalette.shadowPanel,
    raised: colorPalette.shadowRaised,
    glow: colorPalette.shadowPrimary,
    cardHover: colorPalette.shadowCardHover,
};

export const radius = {
    panel: '2xl',
    inner: 'xl',
    pill: 'full',
};

export const transitions = {
    fast: 'all 0.18s ease',
    smooth: 'all 0.2s ease',
};

export const layout = {
    drawerWidth: { base: 'calc(100vw - 1rem)', sm: '22rem' },
    shellMaxWidth: '1600px',
};

export const typography = {
    heroEyebrow: {
        color: colorPalette.primary,
        fontFamily: "'Michroma', sans-serif",
        fontSize: { base: 'xs', md: 'sm' },
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
    },
    heroTitle: {
        color: colorPalette.text,

        fontSize: { base: '2.2rem', md: '3rem', lg: '3.5rem' },
        fontWeight: '800',
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
    },
    pageTitle: {
        color: colorPalette.text,

        fontSize: { base: '1.9rem', md: '2.4rem' },
        fontWeight: '800',
        letterSpacing: '-0.025em',
        lineHeight: 1.1,
    },
    sectionTitle: {
        color: colorPalette.text,
        fontFamily: "'Michroma', sans-serif",
        fontSize: { base: '1.2rem', md: '1.45rem' },
        fontWeight: '700',
        lineHeight: 1.2,
    },
    appTitle: {
        color: colorPalette.text,
        fontFamily: "'Michroma', sans-serif",
        fontSize: { base: '0.85rem', sm: '0.95rem', md: '1.5rem' },
        fontWeight: '900',
        letterSpacing: '0.04em',
        lineHeight: 1.15,
    },
    cardTitle: {
        color: colorPalette.textMuted,
        fontFamily: "'Michroma', sans-serif",
        fontSize: { base: '0.92rem', md: '1rem' },
        fontWeight: '600',
        lineHeight: 1.45,
    },
    body: {
        color: colorPalette.textMuted,
        fontSize: { base: '0.98rem', md: '1.05rem' },
        lineHeight: 1.7,
    },
    label: {
        color: colorPalette.text,
        fontSize: { base: 'sm', md: 'sm' },
        fontWeight: '600',
        lineHeight: 1.4,
    },
};

export const heroPanel = {
    bg: colorPalette.heroPanelGradient,
    borderWidth: '1px',
    borderColor: colorPalette.borderStrong,
    boxShadow: colorPalette.shadowPanel,
};

export const cardImageOverlay = {
    bg: colorPalette.cardImageOverlayGradient,
};

export const surface = {
    bg: colorPalette.surface,
    borderWidth: '1px',
    borderColor: colorPalette.border,
    boxShadow: shadows.panel,
};

export const raisedSurface = {
    bg: colorPalette.surfaceRaised,
    borderWidth: '1px',
    borderColor: colorPalette.border,
    boxShadow: shadows.raised,
};

export const skeletonBase = {
    variant: 'shine',
    css: {
        '--start-color': colorPalette.skeletonBaseStart,
        '--end-color': colorPalette.skeletonBaseEnd,
    },
};

export const skeletonAccent = {
    variant: 'shine',
    css: {
        '--start-color': colorPalette.skeletonAccentStart,
        '--end-color': colorPalette.skeletonAccentEnd,
    },
};

export const headerSurface = {
    backdropFilter: 'blur(15px)',
    bg: colorPalette.surfaceOverlay,
    borderBottomWidth: '1px',
    borderColor: colorPalette.border,
    boxShadow: shadows.raised,
};

export const drawerSurface = {
    bg: colorPalette.surfaceOverlay,
    borderWidth: '1px',
    borderColor: colorPalette.borderStrong,
    boxShadow: colorPalette.shadowPanel,
};

export const dialogPanel = {
    bg: colorPalette.dialogPanelGradient,
    borderWidth: '1px',
    borderColor: colorPalette.borderStrong,
    boxShadow: colorPalette.shadowPanel,
};

export const dialogBackdrop = {
    bg: colorPalette.overlayDark,
};

export const sectionPanel = {
    bg: colorPalette.sectionPanelGradient,
    borderWidth: '1px',
    borderColor: colorPalette.border,
    boxShadow: colorPalette.shadowRaised,
};

export const eventMetaPanel = {
    ...raisedSurface,
    bg: colorPalette.eventMetaGradient,
    borderRadius: radius.inner,
    transition: transitions.smooth,
    _hover: {
        borderColor: colorPalette.borderStrong,
    },
};

export const dangerPanel = {
    bg: colorPalette.dangerPanelGradient,
    borderWidth: '1px',
    borderColor: colorPalette.dangerBorder,
    boxShadow: colorPalette.shadowDanger,
};

export const inputStyles = {
    bg: colorPalette.surfaceInset,
    borderColor: colorPalette.border,
    color: colorPalette.text,
    transition: transitions.smooth,
    _placeholder: { color: colorPalette.textMuted },
    _hover: {
        borderColor: colorPalette.primaryBorder,
    },
    _focusVisible: {
        borderColor: colorPalette.primary,
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
    },
};

export const datePickerPanel = {
    ...dialogPanel,
    borderRadius: radius.inner,
    boxSizing: 'border-box',
    color: colorPalette.text,
    fontSize: { base: 'xs', sm: 'sm', md: 'md' },
    maxH: { base: 'calc(100vh - 10rem)', sm: 'none' },
    maxW: { base: '100%', sm: '22rem', md: 'sm' },
    minW: '0',
    mx: '0',
    overflowX: 'hidden',
    overflowY: { base: 'auto', sm: 'visible' },
    overscrollBehavior: 'contain',
    w: { base: '100%', sm: '22rem', md: 'auto' },
};

export const datePickerCss = {
    color: colorPalette.text,
    '& [data-scope="date-picker"]': {
        color: 'inherit',
    },
    '& [data-scope="date-picker"][data-part="content"]': {
        boxSizing: 'border-box',
        maxWidth: '100%',
        minWidth: 0,
    },
    '& [data-scope="date-picker"][data-part="view"]': {
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
    },
    '& [data-scope="date-picker"][data-part="view-control"]': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
    },
    '& [data-scope="date-picker"][data-part="view-trigger"]': {
        flex: '1 1 auto',
        border: '1px solid transparent',
        borderRadius: '0.5rem',
        minWidth: 0,
        paddingInline: '0.25rem',
        color: colorPalette.text,
        fontSize: '0.8125rem',
        fontWeight: 700,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    '& [data-scope="date-picker"][data-part="view-trigger"]:hover': {
        backgroundColor: colorPalette.primarySoftHover,
        borderColor: colorPalette.primaryBorder,
        color: colorPalette.text,
    },
    '& [data-scope="date-picker"][data-part="view-trigger"]:focus-visible': {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
        outline: 'none',
    },
    '& [data-scope="date-picker"][data-part="prev-trigger"], & [data-scope="date-picker"][data-part="next-trigger"]': {
        border: '1px solid transparent',
        borderRadius: '0.5rem',
        flex: '0 0 auto',
        width: '1.75rem',
        minWidth: 0,
        height: '1.75rem',
        paddingInline: 0,
        color: colorPalette.text,
    },
    '& [data-scope="date-picker"][data-part="prev-trigger"]:not([data-disabled]):not([aria-disabled="true"]):hover, & [data-scope="date-picker"][data-part="next-trigger"]:not([data-disabled]):not([aria-disabled="true"]):hover':
        {
            backgroundColor: colorPalette.primarySoftHover,
            borderColor: colorPalette.primaryBorder,
            color: colorPalette.text,
        },
    '& [data-scope="date-picker"][data-part="prev-trigger"]:focus-visible, & [data-scope="date-picker"][data-part="next-trigger"]:focus-visible':
        {
            boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
            outline: 'none',
        },
    '& [data-scope="date-picker"][data-part="prev-trigger"][data-disabled], & [data-scope="date-picker"][data-part="prev-trigger"][aria-disabled="true"], & [data-scope="date-picker"][data-part="next-trigger"][data-disabled], & [data-scope="date-picker"][data-part="next-trigger"][aria-disabled="true"]':
        {
            color: colorPalette.textMuted,
            opacity: 0.42,
        },
    '& [data-scope="date-picker"][data-part="table"]': {
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
    },
    '& [data-scope="date-picker"][data-part="table-row"]': {
        width: '100%',
    },
    '& [data-scope="date-picker"][data-part="table-header"]': {
        minWidth: 0,
        padding: 0,
        color: colorPalette.textMuted,
        fontSize: '0.6875rem',
        fontWeight: 700,
        lineHeight: 1.6,
        textAlign: 'center',
    },
    '& [data-scope="date-picker"][data-part="table-header"][data-view="day"]': {
        color: colorPalette.text,
        fontWeight: 800,
        letterSpacing: '0.06em',
        paddingBottom: '0.45rem',
        textShadow: `0 0 12px ${colorPalette.primarySoftHover}`,
    },
    '& [data-scope="date-picker"][data-part="table-row"][data-view="day"]:has([data-part="table-header"])': {
        borderBottom: `1px solid ${colorPalette.primaryBorder}`,
    },
    '& [data-scope="date-picker"][data-part="table-cell"]': {
        minWidth: 0,
        padding: 0,
        textAlign: 'center',
    },
    '& [data-scope="date-picker"][data-part="table"][data-view="day"]': {
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        tableLayout: 'fixed',
    },
    '& [data-scope="date-picker"][data-part="table-header"][data-view="day"], & [data-scope="date-picker"][data-part="table"][data-view="day"] [data-part="table-cell"]':
        {
            width: '14.285714%',
            minWidth: 0,
            padding: 0,
            textAlign: 'center',
        },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] th, & [data-scope="date-picker"][role="grid"][data-view="day"] td':
        {
            width: '14.285714%',
            minWidth: 0,
            padding: 0,
            textAlign: 'center',
        },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"]': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minWidth: 0,
        height: '2rem',
        paddingInline: '0.35rem',
        borderRadius: '0.5rem',
        color: colorPalette.text,
        fontSize: '0.8125rem',
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"]': {
        width: 'clamp(1.55rem, 6vw, 1.95rem)',
        aspectRatio: '1 / 1',
        border: '1px solid transparent',
        height: 'clamp(1.55rem, 6vw, 1.95rem)',
        minHeight: '0',
        lineHeight: 1,
        marginInline: 'auto',
        paddingInline: 0,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"]:not([data-disabled]):not([aria-disabled="true"]):not([data-selected]):hover':
        {
            backgroundColor: colorPalette.primarySoftHover,
            borderColor: colorPalette.primaryBorder,
            color: colorPalette.text,
        },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"]:focus-visible': {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
        outline: 'none',
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"][data-selected]': {
        backgroundColor: colorPalette.primary,
        color: colorPalette.primaryText,
        fontWeight: 700,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"][data-today]': {
        border: `1px solid ${colorPalette.primary}`,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"][data-disabled], & [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"][aria-disabled="true"]':
        {
            color: colorPalette.textMuted,
            opacity: 0.42,
        },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-selected]': {
        backgroundColor: colorPalette.primary,
        color: colorPalette.primaryText,
        fontWeight: 700,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-today]': {
        border: `1px solid ${colorPalette.primary}`,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-disabled]': {
        color: colorPalette.textMuted,
        opacity: 0.42,
    },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="month"], & [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="year"]':
        {
            border: '1px solid transparent',
        },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="month"]:not([data-disabled]):not([aria-disabled="true"]):not([data-selected]):hover, & [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="year"]:not([data-disabled]):not([aria-disabled="true"]):not([data-selected]):hover':
        {
            backgroundColor: colorPalette.primarySoftHover,
            borderColor: colorPalette.primaryBorder,
            color: colorPalette.text,
        },
    '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="month"]:focus-visible, & [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="year"]:focus-visible':
        {
            boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
            outline: 'none',
        },
    '& [data-scope="date-picker"][role="grid"][data-view="day"]': {
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        tableLayout: 'fixed',
    },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] button': {
        aspectRatio: '1 / 1',
        minHeight: '0',
        minWidth: 0,
        paddingInline: 0,
        color: colorPalette.text,
        lineHeight: 1,
    },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] button:not([data-disabled]):not([aria-disabled="true"]):hover':
        {
            backgroundColor: colorPalette.primarySoftHover,
            borderColor: colorPalette.primaryBorder,
            boxShadow: `inset 0 0 0 1px ${colorPalette.primaryBorder}`,
            color: colorPalette.text,
        },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] button:focus-visible': {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
        outline: 'none',
    },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] button[data-selected], & [data-scope="date-picker"][role="grid"][data-view="day"] button[aria-selected="true"]':
        {
            backgroundColor: colorPalette.primary,
            color: colorPalette.primaryText,
            fontWeight: 700,
        },
    '& [data-scope="date-picker"][role="grid"][data-view="day"] button[data-disabled], & [data-scope="date-picker"][role="grid"][data-view="day"] button[aria-disabled="true"]':
        {
            color: colorPalette.textMuted,
            opacity: 0.42,
        },
    '@media (max-width: 360px)': {
        '& [data-scope="date-picker"][data-part="view-trigger"]': {
            fontSize: '0.75rem',
        },
        '& [data-scope="date-picker"][data-part="prev-trigger"], & [data-scope="date-picker"][data-part="next-trigger"]':
            {
                width: '1.5rem',
                height: '1.5rem',
            },
        '& [data-scope="date-picker"][data-part="table-cell-trigger"][data-view="day"]': {
            width: '1.55rem',
            aspectRatio: '1 / 1',
            height: '1.55rem',
            fontSize: '0.75rem',
            minHeight: '0',
            lineHeight: 1,
        },
        '& [data-scope="date-picker"][role="grid"][data-view="day"] button': {
            aspectRatio: '1 / 1',
            minHeight: '0',
            minWidth: 0,
            fontSize: '0.75rem',
            paddingInline: 0,
            lineHeight: 1,
        },
    },
};

export const primaryButton = {
    bg: colorPalette.primary,
    color: colorPalette.primaryText,
    borderWidth: '1px',
    borderColor: colorPalette.neutralBorder,
    borderRadius: '1rem',
    boxShadow: colorPalette.primaryShadow,
    fontWeight: '700',
    transition: transitions.smooth,
    _hover: {
        bg: colorPalette.primaryHover,
        boxShadow: colorPalette.primaryShadowHover,
        transform: 'translateY(-1px)',
    },
    _active: {
        bg: colorPalette.primaryActive,
        transform: 'translateY(0)',
    },
    _focusVisible: {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
    },
};

export const secondaryButton = {
    bg: colorPalette.neutralSoft,
    color: colorPalette.text,
    borderWidth: '1px',
    borderColor: colorPalette.border,
    borderRadius: '1rem',
    fontWeight: '600',
    transition: transitions.smooth,
    _hover: {
        bg: colorPalette.neutralSoftHover,
        borderColor: colorPalette.borderStrong,
        boxShadow: colorPalette.shadowRaised,
        transform: 'translateY(-1px)',
    },
    _active: {
        bg: colorPalette.neutralSoftActive,
        transform: 'translateY(0)',
    },
    _focusVisible: {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
    },
};

export const dangerButton = {
    bg: colorPalette.dangerBg,
    color: colorPalette.dangerText,
    borderWidth: '1px',
    borderColor: colorPalette.dangerBorder,
    boxShadow: colorPalette.dangerShadow,
    fontWeight: '600',
    transition: transitions.smooth,
    _hover: {
        bg: colorPalette.dangerHover,
        borderColor: colorPalette.dangerBorder,
        boxShadow: colorPalette.dangerShadowHover,
        color: colorPalette.text,
        transform: 'translateY(-1px)',
    },
    _active: {
        bg: colorPalette.dangerActive,
        transform: 'translateY(0)',
    },
    _focusVisible: {
        boxShadow: `0 0 0 3px ${colorPalette.dangerFocus}`,
    },
};

export const dialogCloseButton = {
    bg: colorPalette.dangerBg,
    borderColor: colorPalette.dangerBorder,
    borderWidth: '1px',
    boxSize: { base: '8', sm: '9', md: '10' },
    color: colorPalette.dangerText,
    type: 'button',
    _focusVisible: {
        boxShadow: `0 0 0 3px ${colorPalette.dangerFocus}`,
    },
    _hover: {
        bg: colorPalette.dangerHover,
        color: colorPalette.text,
        transform: 'translateY(-1px)',
    },
    _active: {
        bg: colorPalette.dangerActive,
        transform: 'translateY(0)',
    },
    css: {
        '& svg': {
            width: '1rem',
            height: '1rem',
        },
        '@media (min-width: 48rem)': {
            '& svg': {
                width: '1.1rem',
                height: '1.1rem',
            },
        },
    },
};

export const drawerCloseButton = {
    bg: 'transparent',
    borderColor: 'transparent',
    borderWidth: '1px',
    boxSize: { base: '8', sm: '9', md: '10' },
    color: colorPalette.textMuted,
    type: 'button',
    _focusVisible: {
        boxShadow: `0 0 0 3px ${colorPalette.focusRing}`,
    },
    _hover: {
        bg: colorPalette.neutralSoftHover,
        color: colorPalette.text,
        transform: 'translateY(-1px)',
    },
    _active: {
        bg: colorPalette.neutralSoftActive,
        transform: 'translateY(0)',
    },
    css: {
        '& svg': {
            width: '1rem',
            height: '1rem',
        },
        '@media (min-width: 48rem)': {
            '& svg': {
                width: '1.1rem',
                height: '1.1rem',
            },
        },
    },
};

export const tag = {
    bg: colorPalette.primarySoft,
    borderWidth: '1px',
    borderColor: colorPalette.primaryBorder,
    color: colorPalette.text,
    boxShadow: colorPalette.shadowPrimary,
    transition: transitions.fast,
    _hover: {
        bg: colorPalette.primarySoftHover,
        borderColor: colorPalette.primaryBorder,
        boxShadow: colorPalette.primaryShadow,
    },
};

export const placeholderBadge = {
    bg: colorPalette.primarySoft,
    borderWidth: '1px',
    borderColor: colorPalette.primaryBorder,
    color: colorPalette.text,
    fontSize: '2xs',
    fontWeight: '600',
    px: '2',
    py: '1',
    rounded: radius.pill,
};
