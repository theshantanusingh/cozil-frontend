#Base image
FROM node:18-alpine

LABEL author="Shantanu Singh <distributedservices.shan@gmail.com>"

# Set working directory
WORKDIR /app

# Coping package.json
COPY package.json ./
# Copying package-lock.json
COPY package-lock.json ./

# Install dependencies
RUN npm install 

#Copying app code
COPY . .

# Exposeing the port the app runs on
EXPOSE 3000

# Running the app
CMD ["npm" , "start"]