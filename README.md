npm run build
cd build
mv index.html 200.html
npx surge --domain http://bgfeedviewer.surge.sh
cd ..