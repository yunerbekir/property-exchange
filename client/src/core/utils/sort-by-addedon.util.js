export const dataSortFunction = (firstItem, secondItem) => {
    if (firstItem.params && firstItem.params.addedOn && secondItem.params && secondItem.params.addedOn) {
        return Math.sign(secondItem.params.addedOn - firstItem.params.addedOn);
    }

    return 1;
};
