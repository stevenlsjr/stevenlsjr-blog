{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "stevenlsjr-blog-server.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "stevenlsjr-blog-server.staticfilesName" -}}
{{- include "stevenlsjr-blog-server.name" . }}-staticfiles
{{- end }}
{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "stevenlsjr-blog-server.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "stevenlsjr-blog-server.staticFullname" -}}
{{- include "stevenlsjr-blog-server.fullname" . }}-staticfiles
{{- end }}
{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "stevenlsjr-blog-server.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "stevenlsjr-blog-server.labels" -}}
helm.sh/chart: {{ include "stevenlsjr-blog-server.chart" . }}
{{ include "stevenlsjr-blog-server.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "stevenlsjr-blog-server.staticfilesLabels" -}}
helm.sh/chart: {{ include "stevenlsjr-blog-server.chart" . }}
{{ include "stevenlsjr-blog-server.staticfilesSelectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "stevenlsjr-blog-server.selectorLabels" -}}
app.kubernetes.io/name: {{ include "stevenlsjr-blog-server.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "stevenlsjr-blog-server.staticfilesSelectorLabels" -}}
app.kubernetes.io/name: {{ include "stevenlsjr-blog-server.staticfilesName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "stevenlsjr-blog-server.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "stevenlsjr-blog-server.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "stevenlsjr-blog-server.envMapping" }}
# {{ .Values.blogServer | toJson }}
envFrom:
{{- with .Values.blogServer.envFrom }}
  {{- toYaml .  | nindent 2 }}
{{- end }}
env:
{{- with .Values.blogServer.env  }}
  {{- toYaml . | nindent 2 }}
{{- end -}}
{{- end }}