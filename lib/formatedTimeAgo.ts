export const formatTimeAgo = (dateString: string): string => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    if (diffInSeconds < 86400) return "Today";
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
    if (days < 365) return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;

    return `${Math.floor(days / 365)} year${days >= 730 ? "s" : ""} ago`;
};
