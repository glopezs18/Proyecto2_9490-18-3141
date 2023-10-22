export default function EnvConfig() {
  const env: any = "prod";

  if (env == "prod") {
    return { BASE_URL: "https://final-project-api-ibbn.onrender.com/api", IMAGE_URL: "https://final-project-api-ibbn.onrender.com/images/" };
  } else {
    return { BASE_URL: "http://localhost:3000/api", IMAGE_URL: "http://localhost:3000/images/" };
  }

}