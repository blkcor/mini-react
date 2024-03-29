export type ElementType = any
export type Key = any
export type Props = any
export type Ref = any

export interface ReactElement {
	$$typeof: symbol | number
	type: ElementType
	key: Key
	ref: Ref
	props: Props
	__mark: string
}
