// ---- Reusable Ellipse Pagination ----
export function getPageList(totalPages, currentPage, siblingCount = 1, boundaryCount = 1) {
    const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    const leftSibling = Math.max(currentPage - siblingCount, boundaryCount + 2);
    const rightSibling = Math.min(
        currentPage + siblingCount,
        totalPages - boundaryCount - 1
    );

    for (let i = 1; i <= boundaryCount; i++) pages.push(i);

    if (leftSibling > boundaryCount + 2) {
        pages.push("...");
    } else {
        for (let i = boundaryCount + 1; i < leftSibling; i++) pages.push(i);
    }

    for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

    if (rightSibling < totalPages - boundaryCount - 1) {
        pages.push("...");
    } else {
        for (let i = rightSibling + 1; i <= totalPages - boundaryCount; i++) pages.push(i);
    }

    for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) pages.push(i);

    return pages;
}
