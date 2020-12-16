export const timeAgo = (date: string) => {
  const transformedDate = new Date().valueOf() - new Date(date).valueOf()
  const dateToMinutes = transformedDate / 1000 / 60
  const minutesHour = 60
  const minutesday = 60 * 24
  const minutesMonth = minutesday * 30
  let timeAgo: string
  console.log(dateToMinutes, 'datetominutes')
  if (dateToMinutes < 1) {
    const secondsLeft = dateToMinutes * 60
    timeAgo =
      secondsLeft < 2 ? '1 second ago' : secondsLeft.toFixed(0) + ' seconds ago'
  } else if (dateToMinutes >= 1 && dateToMinutes < minutesHour) {
    timeAgo =
      dateToMinutes < 2
        ? '1 minute ago'
        : dateToMinutes.toFixed(0) + ' minutes ago'
  } else if (dateToMinutes >= minutesHour && dateToMinutes < minutesday) {
    const totalHours = dateToMinutes / minutesHour
    timeAgo =
      totalHours < 2 ? '1 hour ago' : totalHours.toFixed(0) + ' hours ago'
  } else if (dateToMinutes >= minutesday && dateToMinutes < minutesMonth) {
    const totalDays = dateToMinutes / minutesday
    timeAgo = totalDays < 2 ? '1 day ago' : totalDays.toFixed(0) + ' days ago'
  } else if (
    dateToMinutes >= minutesMonth &&
    dateToMinutes < minutesMonth * 12
  ) {
    const totalMonth = dateToMinutes / minutesMonth
    timeAgo =
      totalMonth < 2 ? '1 month ago' : totalMonth.toFixed(0) + ' months ago'
  } else {
    timeAgo = 'More than 1 year ago'
  }

  return timeAgo
}
