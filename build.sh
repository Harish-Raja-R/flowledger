#!/usr/bin/env bash
# Exit on any failure
set -e

echo "--- Installing backend dependencies ---"
cd backend
npm install
cd ..

echo "--- Installing frontend dependencies ---"
cd frontend
npm install

echo "--- Building production frontend ---"
npm run build
cd ..

echo "--- FlowLedger Build Complete ---"
