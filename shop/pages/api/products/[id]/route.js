// shop/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/mongodb';

export async function GET(req, { params }) {
  const { db } = await connectToDatabase();
  const { id } = params;

  const product = await db.collection('products').findOne({ _id: id });

  return NextResponse.json(product);
}
