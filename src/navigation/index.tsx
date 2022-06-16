import React from 'react';
import { useAuthentication } from '../components/useAuthentication';
import AuthStack from './auth/authStack';
import MainStack from './main/mainStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <MainStack /> : <AuthStack />;
}