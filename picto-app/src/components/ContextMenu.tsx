import React, { useEffect, useCallback, useMemo } from "react";
import { Menu, MenuItem, Divider, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { DocumentTextIcon, LinkIcon, PhotoIcon, VideoCameraIcon, FilmIcon, TagIcon } from "@heroicons/react/24/outline";

type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>>;



interface ContextMenuProps {
  visible: boolean;
  anchorPosition: { x: number; y: number };
  onMenuItemClick: (type: string) => void;
  onClose: () => void;
  onRelocate: (newPosition: { x: number; y: number }) => void;
  isEditMode: boolean;
}

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    minWidth: 200,
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)", // Add a light hover background effect
  },
}));

const StyledDivider = styled(Divider)(() => ({
  margin: "8px 0",
  borderColor: "rgba(0, 0, 0, 0.15)",
  borderWidth: "1.575px",
}));

const MenuSectionTitle = styled(Typography)(() => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "rgba(0, 0, 0, 0.6)",
  padding: "4px 16px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}));

type MenuSection = {
  title: string;
  items: MenuItemType[];
};

type MenuItemType =
  | {
    type: string;
    icon: HeroIcon;
    label: string;
  }
  | { type: "divider" };

const menuSections: MenuSection[] = [
  {
    title: "Annotations",
    items: [
      // { type: "Forme", icon: IoShapesOutline, label: "Forme" },
      { type: "divider" },
      { type: "Text", icon: DocumentTextIcon, label: "Texte" },
      { type: "Label", icon: TagIcon, label: "Étiquette" },
      { type: "divider" },
      { type: "Image", icon: PhotoIcon, label: "Image" },
      { type: "Gif", icon: FilmIcon, label: "GIF" },
      { type: "Video", icon: VideoCameraIcon, label: "Vidéo" },
      { type: "divider" },
      { type: "Hyperlink", icon: LinkIcon, label: "Lien" },
    ],
  },
  // {
  //   title: "Actions",
  //   items: [],
  // },
];

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  anchorPosition,
  onMenuItemClick,
  onClose,
  onRelocate,
  isEditMode,
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!isEditMode) handleClose();
  }, [isEditMode, handleClose]);

  // Relocate the context menu when right-clicking elsewhere while it's open
  useEffect(() => {
    const handleRelocate = (e: MouseEvent) => {
      if (visible) {
        e.preventDefault();
        onRelocate({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener("contextmenu", handleRelocate);
    return () => {
      document.removeEventListener("contextmenu", handleRelocate);
    };
  }, [visible, onRelocate]);

  const menuContent = useMemo(
    () =>
      menuSections.map((section, sectionIndex) => (
        <React.Fragment key={`section-${sectionIndex}`}>
          {sectionIndex > 0 && <StyledDivider />}
          <MenuSectionTitle variant="overline">{section.title}</MenuSectionTitle>
          {section.items.map((item, itemIndex) =>
            item.type === "divider" ? (
              <Divider key={`divider-${sectionIndex}-${itemIndex}`} />
            ) : (
              <StyledMenuItem key={item.type} onClick={() => onMenuItemClick(item.type)}>
                <ListItemIcon>{"icon" in item && <item.icon width={20} height={20}/>}</ListItemIcon>
                {"label" in item && <ListItemText>{item.label}</ListItemText>}
              </StyledMenuItem>
            )
          )}
        </React.Fragment>
      )),
    [onMenuItemClick]
  );

  if (!visible || !isEditMode) return null;

  return (
    <StyledMenu
      open={visible}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: anchorPosition.y, left: anchorPosition.x }}
    >
      {menuContent}
    </StyledMenu>
  );
};

export default React.memo(ContextMenu);
