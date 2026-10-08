# Getting a Climate Data Store (CDS) API key

Later in this workshop, we will use ERA5 monthly climate data from the Copernicus Climate Data Store (CDS). This requires a free personal account and API key.

1.  Create a free account at <https://cds.climate.copernicus.eu/>.
2.  Once logged in, open your user profile page and copy your **Personal Access Token**.
3.  Register it once per computer:
  
  ```{r}
#| eval: false
install.packages("ecmwfr")
library(ecmwfr)
wf_set_key(key = "paste-your-personal-access-token-here")
```

::: {.callout-warning}
## Never save your API key in a script
Type your key directly into the R console, not into a `.qmd` file you save or push to GitHub. Treat it like a password.
:::
  
  # ERA5 monthly reanalysis data
  
  The static climate layer (`GlobalClimate.tif`) gives each site one long-term average. ERA5 gives monthly climate values that can be joined to site-month flux rows.

The download workflow is shown below, but the course data folder already includes processed ERA5 rasters:
  
  -   `data/products/era5_ppt_monthly.tif`
-   `data/products/era5_tmean_monthly.tif`

### Download ERA5 data

```{r}
#| eval: false
library(ecmwfr)

era5_years <- 2006:2018

era5_requests <- lapply(era5_years, function(yr) {
  list(
    dataset_short_name = "reanalysis-era5-single-levels-monthly-means",
    product_type = "monthly_averaged_reanalysis",
    variable = c("2m_temperature", "total_precipitation"),
    year = as.character(yr),
    month = sprintf("%02d", 1:12),
    time = "00:00",
    data_format = "netcdf",
    target = paste0("era5_", yr, ".nc")
  )
})

era5_dir <- file.path("data", "products", "era5")
dir.create(era5_dir, showWarnings = FALSE, recursive = TRUE)

wf_request_batch(request_list = era5_requests,
                 workers = 2,
                 retry = 30,
                 user = "ecmwfr",
                 path = era5_dir)
```

::: {.callout-note}
## Why we use the processed rasters below
ERA5 downloads depend on an external account, API key, and queue. For this workshop, we use processed rasters that have already been downloaded and converted to the right units so the data integration workflow is reproducible in class.
:::
  
  