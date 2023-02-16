export const Search = ({ size, fill, width = 24, height = 24, ...props }) => {
  return (
    <svg fill="none" height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};

export const Sun = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
  if (filled) {
    return (
      <svg width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" {...props}>
        <g fill={fill}>
          <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
          <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
        </g>
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" {...props}>
      <path
        fill={fill}
        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19H12.998V22H10.998zM10.998 2H12.998V5H10.998zM1.998 11H4.998V13H1.998zM18.998 11H21.998V13H18.998z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-45.017 5.986 18.01)"
        d="M4.487 17.01H7.487V19.01H4.487z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-45.001 18.008 5.99)"
        d="M16.508 4.99H19.509V6.99H16.508z"
      ></path>
      <path
        fill={fill}
        transform="rotate(-134.983 5.988 5.99)"
        d="M4.487 4.99H7.487V6.99H4.487z"
      ></path>
      <path
        fill={fill}
        transform="rotate(134.999 18.008 18.01)"
        d="M17.008 16.51H19.008V19.511000000000003H17.008z"
      ></path>
    </svg>
  );
};

export const Moon = ({ fill = "currentColor", filled, size, height, width, label, ...props }) => {
  if (filled) {
    return (
      <svg width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" {...props}>
        <path
          d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
          fill={fill}
        />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" {...props}>
      <path
        fill={fill}
        d="M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z"
      ></path>
    </svg>
  );
};

export const Github = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );
};

export const Logo = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path
        fill={fill}
        d="M5 6a.4.4 0 0 0-.38.62l2 3.38-3.06 5.4a.45.45 0 0 0 0 .45.43.43 0 0 0 .38.19h2.87a.89.89 0 0 0 .79-.55s3-5.31 3.11-5.51l-2-3.46A.91.91 0 0 0 7.92 6zm12.16-4a.84.84 0 0 0-.77.55L10 13.93l4.09 7.52a.91.91 0 0 0 .81.55h2.88a.43.43 0 0 0 .38-.18.45.45 0 0 0 0-.45l-4.07-7.43 6.36-11.31a.45.45 0 0 0 0-.45.44.44 0 0 0-.38-.18z" />
    </svg>
  )
}

export const More = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z" />
      <path fill={fill} d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z" />
    </svg>
  )
}

export const Info = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  )
}

export const BgTheme = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M12 16.114c-3.998-5.951-8.574-7.043-8.78-7.09L2 8.75V10c0 7.29 3.925 12 10 12 5.981 0 10-4.822 10-12V8.75l-1.22.274c-.206.047-4.782 1.139-8.78 7.09z" />
      <path fill={fill} d="M11.274 3.767c-1.799 1.898-2.84 3.775-3.443 5.295 1.329.784 2.781 1.943 4.159 3.685 1.364-1.76 2.826-2.925 4.17-3.709-.605-1.515-1.646-3.383-3.435-5.271L12 3l-.726.767z" />
    </svg>
  )
}

export const RankList = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6.001 6.001 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.216 12.078 4 9.299 4 8zm8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4zm6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83z" />
    </svg>
  )
}

export const Star = ({ size, fill = "currentColor", filled = false, width, height, className, ...props }) => {
  if (filled) {
    return (
      <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
        <path fill={fill} d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
      </svg>
    )
  } else {
    return (
      <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
        <path fill={fill} d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z" />
      </svg>
    )
  }
}

export const Like = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z" />
    </svg>
  )
}

export const DisLike = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z" />
    </svg>
  )
}

export const Share = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z" />
    </svg>
  )
}

export const Message = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm-5 10.5A1.5 1.5 0 0 1 9.5 14c-.086 0-.168-.011-.25-.025-.083.01-.164.025-.25.025a2 2 0 1 1 2-2c0 .085-.015.167-.025.25.013.082.025.164.025.25zm4 1.5c-.086 0-.167-.015-.25-.025a1.471 1.471 0 0 1-.25.025 1.5 1.5 0 0 1-1.5-1.5c0-.085.012-.168.025-.25-.01-.083-.025-.164-.025-.25a2 2 0 1 1 2 2z" />
    </svg>
  )
}

export const DynamicBgTheme = ({ size, fill = "currentColor", fill_1, fill_2, width, height, className, ...props }) => {
  return (
    <svg className={className} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill_1 || fill} d="M13 6c2.507.423 4.577 2.493 5 5h4c-.471-4.717-4.283-8.529-9-9v4z" />
      <path fill={fill_2 || fill} d="M18 13c-.478 2.833-2.982 4.949-5.949 4.949-3.309 0-6-2.691-6-6C6.051 8.982 8.167 6.478 11 6V2c-5.046.504-8.949 4.773-8.949 9.949 0 5.514 4.486 10 10 10 5.176 0 9.445-3.903 9.949-8.949h-4z" />
    </svg>
  )
}

export const BgThemeColor = ({ size, fill = "currentColor", width, height, className, ...props }) => {
  return (
    <svg className={className} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M7.08 11.25A4.84 4.84 0 0 1 8 9.05L4.43 5.49A9.88 9.88 0 0 0 2 11.25zM9.05 8a4.84 4.84 0 0 1 2.2-.91V2a9.88 9.88 0 0 0-5.76 2.43zm3.7-6v5A4.84 4.84 0 0 1 15 8l3.56-3.56A9.88 9.88 0 0 0 12.75 2zM8 15a4.84 4.84 0 0 1-.91-2.2H2a9.88 9.88 0 0 0 2.39 5.76zm3.25 1.92a4.84 4.84 0 0 1-2.2-.92l-3.56 3.57A9.88 9.88 0 0 0 11.25 22zM16 9.05a4.84 4.84 0 0 1 .91 2.2h5a9.88 9.88 0 0 0-2.39-5.76zM15 16a4.84 4.84 0 0 1-2.2.91v5a9.88 9.88 0 0 0 5.76-2.39zm1.92-3.25A4.84 4.84 0 0 1 16 15l3.56 3.56A9.88 9.88 0 0 0 22 12.75z" />
    </svg>
  )
}

export const Reset = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
      <path fill={fill} d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
    </svg>
  )
}

export const Play = ({ size, fill = "currentColor", fill_outer, fill_center, width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill_outer} d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <path fill={fill_center} d="m9 17 8-5-8-5z" />
    </svg>
  )
}

export const Pause = ({ size, fill = "currentColor", fill_outer, fill_center, width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill_outer} d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <path fill={fill_center} d="M13 9h2v6h-2zM9 9h2v6H9z" />
    </svg>
  )
}

export const Audio = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="m19.684 5.821-9-3.272A1.998 1.998 0 0 0 8 4.428v6.129A3.953 3.953 0 0 0 6 10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V4.428L19 7.7v6.856A3.962 3.962 0 0 0 17 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V7.7c0-.838-.529-1.594-1.316-1.879zM6 16c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm11 4c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
    </svg>
  )
}

export const Password = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
      <path fill={fill} d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
    </svg>
  );
}

export const LoginUser = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
    </svg>
  )
}

export const ImageUpload = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M19.999 4h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-13.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5.5 10h-7l4-5 1.5 2 3-4 5.5 7h-7z" />
    </svg>
  )
}

export const SendMail = ({ size, fill = "currentColor", width, height, style, className, ...props }) => {
  return (
    <svg className={className} style={style} fill={fill} height={size || height || 24} viewBox="0 0 24 24" width={size || width || 24} {...props}>
      <path fill={fill} d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z" />
      <path fill={fill} d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z" />
    </svg>
  )
}