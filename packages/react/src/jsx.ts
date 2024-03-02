import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import { ReactElement, ElementType, Key, Props, Ref } from 'shared/ReactTypes'

//ReactElement
const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: ' blkcor'
	}
	return element
}

export const jsx = (type: ElementType, config: any, ...children: any[]) => {
	let key: Key = null
	const props: Props = {}
	let ref: Ref = null

	for (const prop in config) {
		const val = config[prop]
		//key
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val
			}
			continue
		}
		//ref
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val
			}
			continue
		}
		//other props(except prototype properties)
		if ({}.hasOwnProperty.call(config, prop)) {
			if (val !== undefined) {
				props[prop] = val
			}
			continue
		}
		//children
		const childrenLength = children.length
		if (childrenLength) {
			if (childrenLength === 1) {
				props.children = children[0]
			} else {
				props.children = children
			}
		}
	}
	return ReactElement(type, key, ref, props)
}

export const jsxDEV = jsx
