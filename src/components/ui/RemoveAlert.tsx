import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

interface RemoveAlertProps {
  children: React.ReactNode
  title: string
  className?: string
  action: () => void
  isChange?: boolean
}

export default function RemoveAlert({
  children,
  title,
  action,
  className,
  isChange = false,
}: RemoveAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={className}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-semibold'>{title}</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='hover:bg-slate-200'>Không</AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            className={
              isChange ? 'bg-sky-600 hover:bg-sky-600/90' : 'bg-red-500 hover:bg-red-500/90'
            }
          >
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
