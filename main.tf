terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_lambda_function" "lambda_function" {
  filename      = "build/lambda_function_payload.zip"
  function_name = "handler"

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  ]

  handler       = "index.handler"
  source_code_hash = filebase64sha256("build/lambda_function_payload.zip")
  runtime = "nodejs16.x"
}

data "archive_file" "lambda_function_payload" {
  type        = "zip"
  source_dir = "build"
  output_path = "build/lambda_function_payload.zip"
}
