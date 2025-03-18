export const calculateTotalTime = (steps: { duration: number; preparation?: boolean }[] = []) => {
    const totalPreparationTime = steps
        .filter(step => step.preparation)
        .reduce((acc, step) => acc + step.duration, 0);

    const totalCookingTime = steps
        .filter(step => !step.preparation)
        .reduce((acc, step) => acc + step.duration, 0);

    return { totalPreparationTime, totalCookingTime };
};
