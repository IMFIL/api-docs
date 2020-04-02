import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
type LinkProps = {
  children?: React.ReactNode | React.ElementType[]
  to: string
  [x: string]: any // To improve types, might want to inherit from  GatsbyLinkProps<TState> instead
}
// replace anything with /workers or / prepended to just /workers
const stripWokrers = (url: string) =>
  url.replace(/^(\/api){1,3}/, '').replace(/^\/(?!\/)/, '/api/')

export const Src = (src: string) => {
  // export const Src: React.FC<LinkProps> = ({ children, to, ...other }) => {
  const internal = /^\/(?!\/)/.test(src)

  // Use Gatsby Link for internal links, and <a> for others
  return internal ? stripWokrers(src) : src
}
export const Link: React.FC<LinkProps> = ({ children, to, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink to={stripWokrers(to)} {...other}>
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}
type ImageProps = {
  children: React.ElementType
  src: string
}
export const Image: React.FC<ImageProps> = ({ children, src, ...props }) => {
  const internal = /^\/(?!\/)/.test(src)

  if (internal) {
    return (
      <img src={'/api' + src} {...props}>
        {children}
      </img>
    )
  }
  return (
    <img src={src} {...props}>
      {children}
    </img>
  )
}
