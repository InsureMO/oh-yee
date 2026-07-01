import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import { useLocale } from '../locale';
import mergeContextToProps from '../utils/mergeContextToProps';
import Input from './input';
import type { PasswordProps } from './interface';

import './style/index.less';

const Password = forwardRef<HTMLInputElement, PasswordProps>(
  (baseProps, ref) => {
    const { password } = useContext(GlobalContext);
    const props = mergeContextToProps(baseProps, password);
    const { locale } = useLocale();
    const { input: inputLocale } = locale;

    const {
      visibilityToggle = true,
      prefixCls = 'yee-input-password',
      suffix,
      ...rest
    } = props;

    const [visible, setVisible] = React.useState(false);

    const toggleVisible = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      setVisible(!visible);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleVisible(e);
      }
    };

    const renderSuffix = () => {
      if (!visibilityToggle) {
        return suffix;
      }

      const icon = visible ? (
        <EyeOff
          size={14}
          strokeWidth={1}
          onClick={toggleVisible}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={inputLocale.hidePassword}
        />
      ) : (
        <Eye
          size={14}
          strokeWidth={1}
          onClick={toggleVisible}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={inputLocale.showPassword}
        />
      );

      return (
        <>
          {icon}
          {suffix}
        </>
      );
    };

    return (
      <Input
        {...rest}
        ref={ref}
        className={prefixCls}
        type={visible ? 'text' : 'password'}
        suffix={renderSuffix()}
      />
    );
  },
);

export default Password;
