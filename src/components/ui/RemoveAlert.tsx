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
}

export default function RemoveAlert({ children, title, action, className }: RemoveAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-semibold'>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='hover:bg-slate-200'>Không</AlertDialogCancel>
          <AlertDialogAction onClick={action} className='bg-red-500 hover:bg-red-500/90'>
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
