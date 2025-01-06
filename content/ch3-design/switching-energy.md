+++
prev = "/ch3-design/nextsteps"
weight = 11
title = "Switching Energy Estimates"
toc = true
next = "/blas"
date = "2025-01-05T13:39:38-05:00"

+++

This page contains background information regarding the switching energy estimates so
important to designing energy-efficient data paths.

## Register Read/Write Energy Estimates by Process Node
Note: Values are approximate and may vary by foundry and implementation

| Register  | 28/22nm (fJ) | 16/14/12nm (fJ) | 7/6/5nm (fJ) | 3nm (fJ)  | 2nm (fJ)  |
|-----------|--------------|-----------------|--------------|-----------|-----------|
| Read bit  | 2.5 - 3.5    | 1.8 - 2.3       | 0.9 - 1.2    | 0.6 - 0.8 | 0.4 - 0.6 |
| Write bit | 3.0 - 4.0    | 2.0 - 2.8       | 1.1 - 1.5    | 0.7 - 1.0 | 0.5 - 0.8 |

**Notes:**
- Values assume typical operating conditions (TT corner, nominal voltage, 25°C)
- Energy includes both dynamic and short-circuit power
- Leakage power not included
- Values are for basic register operations without additional clock tree or routing overhead
- Advanced nodes (3nm, 2nm) are based on early estimates and projections

## Register file energy estimates

 All values in femtojoules per bit (fJ/bit)

| Operation | Size      | 28/22nm     | 16/14/12nm    | 7/6/5nm     | 3nm         | 2nm         |
|-----------|-----------|-------------|---------------|-------------|-------------|-------------|
| Read      |           |             |               |             |             |             |
|           | 32-entry  | 8.5  - 10.5 | 6.00  -  7.50 | 3.20 - 4.00 | 2.25 - 2.80 | 1.57 - 1.95 |
|           | 64-entry  | 12.0 - 14.0 | 8.50  - 10.00 | 4.50 - 5.50 | 3.15 - 3.85 | 2.21 - 2.70 |
|           | 128-entry | 16.0 - 18.0 | 11.00 - 13.00 | 6.00 - 7.00 | 4.20 - 4.90 | 2.95 - 3.45 |
| Write     |           |             |               |             |             |             |
|           | 32-entry  | 10.0 - 12.0 | 7.00  -  8.50 | 3.80 - 4.60 | 2.65 - 3.25 | 1.85 - 2.28 |
|           | 64-entry  | 14.0 - 16.0 | 10.00 - 11.50 | 5.20 - 6.20 | 3.65 - 4.35 | 2.55 - 3.05 |
|           | 128-entry | 18.0 - 20.0 | 13.00 - 15.0  | 7.00 - 8.00 | 4.90 - 5.60 | 3.45 - 3.95 |

**Notes:**
- All values in femtojoules per bit (fJ/bit)
- Assumes typical operating conditions (TT corner, nominal voltage, 25°C)
- Includes decoder, wordline, and bitline energy
- Includes local clock distribution
- Includes both dynamic and short-circuit power
- Values represent single read port, single write port configuration

## Integer Arithmetic and Logic Unit Switching Energy Estimates

| Unit Type | Bit Size | 28/22nm (pJ) | 16/14/12nm (pJ) | 7/6/5nm (pJ) | 3nm (pJ) | 2nm (pJ) |
|-----------|----------|--------------|-----------------|--------------|----------|----------|
| **CPU ALU** | | | | | | |
| | 8-bit     | 0.45 - 0.65  | 0.30 - 0.43    | 0.20 - 0.29   | 0.13 - 0.19 | 0.09 - 0.13 |
| | 16-bit    | 0.90 - 1.30  | 0.60 - 0.86    | 0.40 - 0.58   | 0.26 - 0.38 | 0.18 - 0.26 |
| | 24-bit    | 1.35 - 1.95  | 0.90 - 1.30    | 0.60 - 0.87   | 0.39 - 0.57 | 0.27 - 0.40 |
| | 32-bit    | 1.80 - 2.60  | 1.20 - 1.73    | 0.80 - 1.16   | 0.52 - 0.76 | 0.36 - 0.53 |
| | 40-bit    | 2.25 - 3.25  | 1.50 - 2.16    | 1.00 - 1.45   | 0.65 - 0.95 | 0.45 - 0.66 |
| | 48-bit    | 2.70 - 3.90  | 1.80 - 2.60    | 1.20 - 1.74   | 0.78 - 1.14 | 0.54 - 0.79 |
| | 56-bit    | 3.15 - 4.55  | 2.10 - 3.03    | 1.40 - 2.03   | 0.91 - 1.33 | 0.63 - 0.92 |
| | 64-bit    | 3.60 - 5.20  | 2.40 - 3.47    | 1.60 - 2.32   | 1.04 - 1.52 | 0.72 - 1.05 |
| **GPU ALU** | | | | | | |
| | 8-bit     | 0.60 - 0.85  | 0.40 - 0.57    | 0.27 - 0.38   | 0.17 - 0.25 | 0.12 - 0.17 |
| | 16-bit    | 1.20 - 1.70  | 0.80 - 1.14    | 0.53 - 0.76   | 0.35 - 0.50 | 0.24 - 0.35 |
| | 24-bit    | 1.80 - 2.55  | 1.20 - 1.71    | 0.80 - 1.14   | 0.52 - 0.75 | 0.36 - 0.52 |
| | 32-bit    | 2.40 - 3.40  | 1.60 - 2.28    | 1.07 - 1.52   | 0.69 - 1.00 | 0.48 - 0.70 |
| | 40-bit    | 3.00 - 4.25  | 2.00 - 2.85    | 1.33 - 1.90   | 0.86 - 1.25 | 0.60 - 0.87 |
| | 48-bit    | 3.60 - 5.10  | 2.40 - 3.42    | 1.60 - 2.28   | 1.04 - 1.50 | 0.72 - 1.04 |
| | 56-bit    | 4.20 - 5.95  | 2.80 - 3.99    | 1.87 - 2.66   | 1.21 - 1.75 | 0.84 - 1.21 |
| | 64-bit    | 4.80 - 6.80  | 3.20 - 4.56    | 2.13 - 3.04   | 1.38 - 2.00 | 0.96 - 1.38 |
| **DSP ALU** | | | | | | |
| | 8-bit     | 0.55 - 0.75  | 0.37 - 0.53    | 0.25 - 0.35   | 0.16 - 0.23 | 0.11 - 0.16 |
| | 16-bit    | 1.10 - 1.50  | 0.73 - 1.00    | 0.49 - 0.70   | 0.32 - 0.46 | 0.22 - 0.32 |
| | 24-bit    | 1.65 - 2.25  | 1.10 - 1.50    | 0.73 - 1.05   | 0.48 - 0.69 | 0.33 - 0.48 |
| | 32-bit    | 2.20 - 3.00  | 1.47 - 2.00    | 0.98 - 1.40   | 0.63 - 0.92 | 0.44 - 0.64 |
| | 40-bit    | 2.75 - 3.75  | 1.83 - 2.50    | 1.22 - 1.75   | 0.79 - 1.15 | 0.55 - 0.80 |
| | 48-bit    | 3.30 - 4.50  | 2.20 - 3.00    | 1.47 - 2.10   | 0.95 - 1.38 | 0.66 - 0.96 |
| | 56-bit    | 3.85 - 5.25  | 2.57 - 3.50    | 1.71 - 2.45   | 1.11 - 1.61 | 0.77 - 1.12 |
| | 64-bit    | 4.40 - 6.00  | 2.93 - 4.00    | 1.96 - 2.80   | 1.27 - 1.84 | 0.88 - 1.28 |

**Notes:**
- Values are approximate switching energy in picojoules (pJ)
- Represents typical dynamic switching energy per operation
- Accounts for:
  - Arithmetic data path logic operations
  - Typical instruction mix for each design point


# Floating-Point Unit Switching Energy Estimates

| Unit Type | Bit Size | 28/22nm (pJ) | 16/14/12nm (pJ) | 7/6/5nm (pJ) | 3nm (pJ) | 2nm (pJ) |
|-----------|----------|--------------|-----------------|--------------|----------|----------|
| **CPU FPU** | | | | | | |
| | 8-bit     | 1.20 - 1.70  | 0.80 - 1.14    | 0.53 - 0.76   | 0.35 - 0.50 | 0.24 - 0.35 |
| | 16-bit    | 1.80 - 2.60  | 1.20 - 1.73    | 0.80 - 1.16   | 0.52 - 0.76 | 0.36 - 0.53 |
| | 32-bit    | 3.60 - 5.20  | 2.40 - 3.47    | 1.60 - 2.32   | 1.04 - 1.52 | 0.72 - 1.05 |
| | 64-bit    | 7.20 - 10.40 | 4.80 - 6.93    | 3.20 - 4.64   | 2.08 - 3.04 | 1.44 - 2.10 |
| **GPU FPU** | | | | | | |
| | 8-bit     | 1.60 - 2.30  | 1.07 - 1.53    | 0.71 - 1.02   | 0.46 - 0.66 | 0.32 - 0.46 |
| | 16-bit    | 2.40 - 3.40  | 1.60 - 2.28    | 1.07 - 1.52   | 0.69 - 1.00 | 0.48 - 0.70 |
| | 32-bit    | 4.80 - 6.80  | 3.20 - 4.56    | 2.13 - 3.04   | 1.38 - 2.00 | 0.96 - 1.38 |
| | 64-bit    | 9.60 - 13.60 | 6.40 - 9.13    | 4.27 - 6.08   | 2.76 - 4.00 | 1.92 - 2.76 |
| **DSP FPU** | | | | | | |
| | 8-bit     | 1.40 - 2.00  | 0.93 - 1.33    | 0.62 - 0.89   | 0.40 - 0.58 | 0.28 - 0.40 |
| | 16-bit    | 2.20 - 3.00  | 1.47 - 2.00    | 0.98 - 1.40   | 0.63 - 0.92 | 0.44 - 0.64 |
| | 32-bit    | 4.40 - 6.00  | 2.93 - 4.00    | 1.96 - 2.80   | 1.27 - 1.84 | 0.88 - 1.28 |
| | 64-bit    | 8.80 - 12.00 | 5.87 - 8.00    | 3.91 - 5.60   | 2.54 - 3.68 | 1.76 - 2.56 |

**Notes:**
- Values are approximate switching energy in picojoules (pJ)
- 8-bit FPU estimates based on IEEE fp8 standard
- Represents typical dynamic switching energy per operation
- Accounts for:
  - Arithmetic logic operations
  - Floating-point operations (for FPU)
  - Typical instruction mix for each design point
