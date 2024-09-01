// shop/pages/dashboard/_middleware.js

import { NextResponse } from 'next/server';
import { getSession } from '../../utils/session';

export async function middleware(req) {
  const session = await getSession(req);

  if (!session?.user) {
    return NextResponse.redirect('/signin');
  }

  return NextResponse.next();
}
