export const calculatePostedAgo = (createdAt: string): string => {
    const creationDate = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - creationDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} j`;
};