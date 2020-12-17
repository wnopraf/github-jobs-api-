import { timeAgo } from '../lib/util'

const minutesFromMils = 60 * 1000
const hoursFromMils = 60 * minutesFromMils
const daysFromMils = hoursFromMils * 24
const monthFromMils = daysFromMils * 30

const oneSecondAgo = Date.now() - 1000
const twnteeSecondsAgo = Date.now() - 20 * 1000
const oneMinuteAgo = Date.now() - minutesFromMils
const fiveMinutesAgo = Date.now() - minutesFromMils * 5
const twoHoursAgo = new Date().valueOf() - hoursFromMils * 2
const threeHoursAgo = new Date().valueOf() - hoursFromMils * 3
const fourHoursAgo = new Date().valueOf() - hoursFromMils * 4
const oneMonthAgo = Date.now() - monthFromMils
const threeMonthAgo = Date.now() - monthFromMils * 3

test('1 second ago', () => {
  expect(timeAgo(new Date(oneSecondAgo).toISOString())).toBe('1 second ago')
})
test('20 seconds ago', () => {
  expect(timeAgo(new Date(twnteeSecondsAgo).toISOString())).toBe(
    '20 seconds ago'
  )
})

test('one minute ago', () => {
  expect(timeAgo(new Date(oneMinuteAgo).toISOString())).toBe('1 minute ago')
})
test('5 minutes ago', () => {
  expect(timeAgo(new Date(fiveMinutesAgo).toISOString())).toBe('5 minutes ago')
})

test('2 hours ago', () => {
  expect(timeAgo(new Date(twoHoursAgo).toISOString())).toBe('2 hours ago')
})
test('3 hours ago', () => {
  expect(timeAgo(new Date(threeHoursAgo).toISOString())).toBe('3 hours ago')
})
test('4 hours ago', () => {
  expect(timeAgo(new Date(fourHoursAgo).toISOString())).toBe('4 hours ago')
})
test('1 month ago', () => {
  expect(timeAgo(new Date(oneMonthAgo).toISOString())).toBe('1 month ago')
})
test('3 months ago', () => {
  expect(timeAgo(new Date(threeMonthAgo).toISOString())).toBe('3 months ago')
})
