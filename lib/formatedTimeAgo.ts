export const formatTimeAgo = (dateString: string): string => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds >= 0) {
        if (diffInSeconds < 86400) return "Today";
        if (diffInDays === 1) return "1 day ago";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${diffInDays >= 14 ? "s" : ""} ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${diffInDays >= 60 ? "s" : ""} ago`;
        return `${Math.floor(diffInDays / 365)} year${diffInDays >= 730 ? "s" : ""} ago`;
    } else {
        const futureDays = Math.abs(diffInDays);
        if (futureDays === 0) return "Today";
        if (futureDays === 1) return "Tomorrow";
        if (futureDays < 7) return `In ${futureDays} days`;
        if (futureDays < 30) return `In ${Math.floor(futureDays / 7)} week${futureDays >= 14 ? "s" : ""}`;
        if (futureDays < 365) return `In ${Math.floor(futureDays / 30)} month${futureDays >= 60 ? "s" : ""}`;
        return `In ${Math.floor(futureDays / 365)} year${futureDays >= 730 ? "s" : ""}`;
    }
};
