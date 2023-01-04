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

resource "aws_iam_role" "iam_for_lambda" {
  name = "lambda_function_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
      }
    ]
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  ]
}

resource "aws_lambda_function" "lambda_function" {
  filename      = "lambda_function_payload.zip"
  function_name = "handler"

  role = aws_iam_role.iam_for_lambda.arn

  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_function_payload.output_base64sha256
  runtime          = "nodejs16.x"

  depends_on = [
    data.archive_file.lambda_function_payload
  ]
}

data "archive_file" "lambda_function_payload" {
  type        = "zip"
  source_dir  = "./build"
  output_path = "lambda_function_payload.zip"
}
