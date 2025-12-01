ARG PYTHON_VERSION=3.14.0

# Dev build
FROM python:${PYTHON_VERSION}-slim as dev

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /app

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

USER appuser

COPY . /app/backend

EXPOSE 8000

CMD ["fastapi", "run", "backend/main.py", "--host", "0.0.0.0", "--port", "8000"]

# Prod Build
FROM python:${PYTHON_VERSION}-slim as prod

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

WORKDIR /app

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

USER appuser

COPY . /app/backend

EXPOSE 8000

CMD ["fastapi", "run", "backend/main.py", "--host", "0.0.0.0", "--port", "8000"]
