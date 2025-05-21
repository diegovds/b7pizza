import { ComponentProps } from 'react'
import { Input } from '../ui/input'

type Props = ComponentProps<'input'> & {
  name: string
  errors: string | undefined
}

export const CustomInput = (props: Props) => {
  return (
    <div>
      <Input
        {...props}
        className={`${props.errors ? 'border border-red-800' : ''}`}
      />
      {props.errors && (
        <div className="mt-1 text-sm text-red-800">{props.errors}</div>
      )}
    </div>
  )
}
