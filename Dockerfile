FROM node:14-stretch-slim as build
ENV REACT_APP_WEB_API=http://68.183.239.178:6969
ENV REACT_APP_GOOGLE_ID=518404312823-ibh4ph48o4p3ad7b6f4jd4eoiv6m4o7l.apps.googleusercontent.com
ENV REACT_APP_FACEBOOK_ID=703530593917463
WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
