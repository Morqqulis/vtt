import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
//----------------------------------------------

type CustomDialogProps = {
	title: string
	contentChildren: React.ReactNode
	description?: string
	triggerChildren?: React.ReactNode
	footerChildren?: React.ReactNode
	className?: string
}

export default function CustomDialog({
	title,
	description,
	triggerChildren,
	contentChildren,
	footerChildren,
	className,
}: CustomDialogProps) {
	return (
		<Dialog>
			{triggerChildren && <DialogTrigger asChild>{triggerChildren}</DialogTrigger>}
			<DialogContent className={`${className}`}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
					{contentChildren}
				</DialogHeader>
			</DialogContent>
			{footerChildren && <DialogFooter>{footerChildren}</DialogFooter>}
		</Dialog>
	)
}
