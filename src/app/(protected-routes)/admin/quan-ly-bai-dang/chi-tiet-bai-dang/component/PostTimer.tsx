import { DateTimePicker } from '@/components/ui'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

interface PostTimerProps {
  children: React.ReactNode
  datetime?: Date
  selectDatetime: (date: Date | undefined) => void
}

export default function PostTimer({ children, datetime, selectDatetime }: PostTimerProps) {
  const [date, setDate] = useState(datetime)

  const selectDate = () => {
    selectDatetime(date)
  }

  useEffect(() => {
    setDate(datetime)
  }, [datetime])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[513px] max-sm:max-w-[328px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Hẹn giờ đăng</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className='flex gap-4 flex-col'>
          <DateTimePicker date={date} setDate={setDate} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='submit'
              onClick={selectDate}
              className='bg-sky-600 text-white hover:bg-sky-600'
            >
              Hẹn giờ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
