import { Link } from "@nextui-org/react"

export const LinkSocialIcon = ({icon, href, css, rel = "noreferrer", target = "_blank"}) => {
  return (
    <Link
      className="navbar__social-icon"
      css= {{mx: "$4", "& svg": {transition: "$default"}, "&:hover": {"& svg": {opacity: 0.7}}, ...css}}
      href={href}
      rel={rel}
      target={target}>
      {icon}
    </Link>
  )
}

export default LinkSocialIcon