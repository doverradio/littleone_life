export const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
};

export const onDrop = (e, targetId, icons, setIcons) => {
    const id = e.dataTransfer.getData('id');
    const draggedIcon = icons.find(icon => icon.id === id);
    const targetIconIndex = icons.findIndex(icon => icon.id === targetId);

    const newIcons = [...icons];
    newIcons.splice(icons.indexOf(draggedIcon), 1);
    newIcons.splice(targetIconIndex, 0, draggedIcon);

    setIcons(newIcons);
};
