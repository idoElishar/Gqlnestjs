
# Project Title

A brief description of what this project does and who it's for


## Installation

Install my-project with npm

```bash
  npm install 
  nest start
```
    
## Run Locally

Clone the project

```bash
  git clone -b try-redis https://github.com/idoElishar/Gqlnestjs.git
```

Go to the project directory

```bash
  cd Gqlnestjs
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nest start


## API Reference

#### Get all Courses

```http
 GET http://localhost:3000/graphql
{
  Courses {
    id
    courseName
    description
    lectures {
      title
    }
    exercises {
      title
    }
    topicsCovered {
   topic
    }
    lecturer
    imageURL
  }
}

