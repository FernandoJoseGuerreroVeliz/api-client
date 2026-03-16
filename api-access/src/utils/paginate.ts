export function paginate<T>(
    data: T[],
    totalCount: number,
    page: number,
    limit: number,
) {
    const totalPages = Math.ceil(totalCount / limit)

    return {
        data,
        limit,
        page,
        totalCount,
        hasMore: page < totalPages,
    }
}
