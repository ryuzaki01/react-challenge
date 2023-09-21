import { styled } from '../../stitches.config'
import Flex from './Flex'
import { forwardRef } from 'react'
import * as propType from 'prop-types'

export const StyledInput = styled('input', {
  all: 'unset',
  width: '100%',
  px: 16,
  py: 12,
  borderRadius: 8,
  fontFamily: '$body',
  fontSize: 16,
  color: '$gray12',
  backgroundColor: '$gray3',
  $$focusColor: '$colors$primary8',
  '&::placeholder': { color: '$gray10' },
  '&:focus': { boxShadow: 'inset 0 0 0 2px $$focusColor' },
  '&:disabled': {
    backgroundColor: '$gray2',
    color: '$gray9',
  },
  '&[type="checkbox"]': {
    p: 0,
    borderRadius: 0,
    width: '1.5em',
    height: '1.5em',
    placeContent: 'center',
    boxShadow: 'inset 0 0 0 2px $$focusColor',
  },
  '&[type="checkbox"]::before': {
    content: '',
    display: 'inline-block',
    width: '1.1em',
    height: '1.1em',
    ml: '0.2em',
    mt: '0.2em',
    transform: 'scale(0)',
    transition: '120ms transform ease-in-out',
    boxShadow: 'inset 1em 1em $colors$primary13',
  },
  '&:checked::before': {
    transform: 'scale(1)',
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },

  '&[type=number]': {
    '-moz-appearance': 'textfield',
  },
})

const Input = forwardRef(
  (
    { _children, icon, css, containerCss, iconStyles, ...props },
    forwardedRef,
  ) => (
    <Flex css={{ ...containerCss, position: 'relative' }}>
      {icon && (
        <div style={{ position: 'absolute', top: 16, left: 16, ...iconStyles }}>
          {icon}
        </div>
      )}
      <StyledInput
        css={{ pl: icon ? 48 : 16, ...css }}
        ref={forwardedRef}
        {...props}
      />
    </Flex>
  ),
)

Input.displayName = 'Wrapped(Input)'
Input.propTypes = {
  _children: propType.node,
  icon: propType.string,
  css: propType.object,
  containerCss: propType.object,
  iconStyles: propType.object,
}

export default Input
