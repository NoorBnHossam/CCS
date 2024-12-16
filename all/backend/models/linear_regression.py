class LinearRegression:
    def __init__(self):
        self.slope = None
        self.intercept = None

    def calculate_regression(self, x, y):
        N = len(x)
        sum_x = sum(x)
        sum_y = sum(y)
        sum_xy = sum(x[i] * y[i] for i in range(N))
        sum_x2 = sum(x[i] ** 2 for i in range(N))

        # Slope (m)
        self.slope = (N * sum_xy - sum_x * sum_y) / (N * sum_x2 - sum_x ** 2)

        # Intercept (b)
        self.intercept = (sum_y - self.slope * sum_x) / N

        return self.slope, self.intercept

    def predict_y(self, x):
        if self.slope is None or self.intercept is None:
            raise ValueError("Model is not trained yet. Calculate regression first.")
        return self.slope * x + self.intercept

    def predict_x(self, y):
        if self.slope is None or self.intercept is None:
            raise ValueError("Model is not trained yet. Calculate regression first.")
        return (y - self.intercept) / self.slope
