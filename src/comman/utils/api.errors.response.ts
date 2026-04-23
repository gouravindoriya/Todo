import type { Response } from "express";

class ApiErrorResponse {

  static badRequest(res: Response, message: string = "Bad Request") {
    return res.status(400).json({
      success: false,
      message
    });
  }

  static unauthorized(res: Response, message: string = "Unauthorized") {
    return res.status(401).json({
      success: false,
      message
    });
  }

  static forbidden(res: Response, message: string = "Forbidden") {
    return res.status(403).json({
      success: false,
      message
    });
  }

  static notFound(res: Response, message: string = "Not Found") {
    return res.status(404).json({
      success: false,
      message
    });
  }

  static internal(res: Response, message: string = "Internal Server Error") {
    return res.status(500).json({
      success: false,
      message
    });
  }
}

export default ApiErrorResponse;